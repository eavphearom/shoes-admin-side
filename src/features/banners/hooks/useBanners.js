import { useEffect, useState } from "react";
import bannerService from "../services/bannerService";

const defaultOptions = [
  { value: "all", label: "All" },
  { value: "true", label: "Active" },
  { value: "false", label: "Inactive" },
];

export default function useBanners() {
  const [banners, setBanners] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // create
  const [refreshKey, setRefreshKey] = useState(0);
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    const fetchBanners = async () => {
      setLoading(true);
      setError("");

      try {
        const params = {
          pageNo: page,
          perPage,
          search: search.trim(),
        };

        // Only send the filter when a status is selected.
        if (statusFilter !== "all") {
          params.is_active = statusFilter === "true";
        }

        const response = await bannerService.getAll(params, controller.signal);

        if (controller.signal.aborted) return;

        // Convert the backend boolean into a UI status.
        const items = (response.data ?? []).map((banner) => ({
          ...banner,
          status: banner.is_active ? "Active" : "Inactive",
        }));

        setBanners(items);
        setPagination(response.pagination);
      } catch (err) {
        if (controller.signal.aborted) return;

        setError(err.response?.data?.message || "Failed to load banners.");
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchBanners();

    return () => controller.abort();
  }, [page, perPage, search, statusFilter, refreshKey]);

  const handleSearch = (value) => {
    setSearch(value);
    setPage(1);
  };

  const handleStatusFilter = (value) => {
    setStatusFilter(value);
    setPage(1);
  };

  const handlePerPageChange = (value) => {
    setPerPage(Number(value));
    setPage(1);
  };

  // create
  const create = async (values) => {
    setCreating(true);

    try {
      const formData = new FormData();

      formData.append("title", values.title);
      formData.append("subtitle", values.subtitle ?? "");
      formData.append("is_active", String(values.is_active));
      if (values.image instanceof File) {
        formData.append("image", values.image);
      }

      const response = await bannerService.create(formData);

      // Refresh the list after successful creation.
      setPage(1);
      setRefreshKey((prev) => prev + 1);

      return response;
    } finally {
      setCreating(false);
    }
  };

  return {
    banners,
    defaultOptions,
    statusFilter,
    onStatusFilter: handleStatusFilter,
    loading,
    error,
    search,
    page,
    perPage,
    totalPages: pagination?.total_page ?? 0,
    totalItems: pagination?.total ?? 0,
    startIndex: (page - 1) * perPage,
    onSearch: handleSearch,
    onPageChange: setPage,
    handlePerPageChange,

    // create
    create,
    creating,
  };
}
