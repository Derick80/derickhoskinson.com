"use client";

import { Button } from "../ui/button";

const ClearSearchParamsButton = ({
  searchParams,
}: {
  searchParams: {
    [key: string]: string;
  };
}) => {
  const categories = searchParams.category;
  const handleClearSearchParams = () => {
    // remove search params
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.delete("category");
    window.location.search = searchParams.toString();
  };
  return <Button onClick={handleClearSearchParams}>Clear search</Button>;
};

export default ClearSearchParamsButton;
