import { useState } from "react";

export default function useBanners() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Statuses");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const [banners, setBanners] = useState([
    {
      id: 1,
      title: "Summer Sneaker Drop",
      subtitle: "Fresh arrivals for everyday comfort",
      placement: "Homepage Hero",
      link: "/products",
      status: "Active",
      image: null,
      createdAt: "Sep 12, 2026",
    },
    {
      id: 2,
      title: "Running Essentials",
      subtitle: "Performance shoes built for every mile",
      placement: "Category Header",
      link: "/category",
      status: "Active",
      image: null,
      createdAt: "Sep 10, 2026",
    },
    {
      id: 3,
      title: "Clearance Sale",
      subtitle: "Last pairs at special prices",
      placement: "Promo Strip",
      link: "/products",
      status: "Inactive",
      image: null,
      createdAt: "Sep 01, 2026",
    },
  ]);

  const statusOptions = [
    { value: "All Statuses", label: "All Statuses" },
    { value: "Active", label: "Active" },
    { value: "Inactive", label: "Inactive" },
  ];

  const addBanner = (data) => {
    const newBanner = {
      id: Date.now(),
      createdAt: "Today",
      ...data,
    };

    setBanners((prevBanners) => [newBanner, ...prevBanners]);
  };

  const updateBanner = (id, data) => {
    setBanners((prevBanners) =>
      prevBanners.map((banner) =>
        banner.id === id ? { ...banner, ...data } : banner,
      ),
    );
  };

  const deleteBanner = (id) => {
    setBanners((prevBanners) =>
      prevBanners.filter((banner) => banner.id !== id),
    );
  };

  const filteredBanners = banners.filter(
    (banner) =>
      (statusFilter === "All Statuses" || banner.status === statusFilter) &&
      (banner.title.toLowerCase().includes(search.toLowerCase()) ||
        banner.placement.toLowerCase().includes(search.toLowerCase())),
  );

  const totalPages = Math.ceil(filteredBanners.length / perPage);
  const startIndex = (page - 1) * perPage;
  const paginatedBanners = filteredBanners.slice(
    startIndex,
    startIndex + perPage,
  );

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

  return {
    banners: paginatedBanners,
    search,
    handleSearch,
    statusFilter,
    handleStatusFilter,
    statusOptions,
    page,
    setPage,
    totalPages,
    totalItems: filteredBanners.length,
    startIndex,
    perPage,
    handlePerPageChange,
    addBanner,
    updateBanner,
    deleteBanner,
  };
}
