import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Sidebar } from "flowbite-react";
import { HiArrowSmRight, HiUser } from "react-icons/hi";

export default function DashSidebar() {
  const location = useLocation();
  const [tab, setTab] = useState("");
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);
  return (
    <Sidebar className='w-full md:w-56'>
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Link to="/dashboard?tab=profile">
            <Sidebar.Item
              active={tab === "profile"}
              icon={HiUser}
              label={"Usuario"}
              labelColor="dark"
              as='div'
            >
              Perfil
            </Sidebar.Item>
          </Link>
          <Sidebar.Item icon={HiArrowSmRight} className="cursor-pointer">
            Cerrar Sesión
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
