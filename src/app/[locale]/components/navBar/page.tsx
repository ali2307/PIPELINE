"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import MenuLogo from "./../../../assets/img/menu.svg";
import User from "./../../../assets/img/user.png";
import Logo from "./../../../assets/img/logo-wh.svg";
import LogoFixed from "./../../../assets/img/logo-fixed.svg";
import MenuFixed from "./../../../assets/img/menu-fixed.svg";
import SideBar from "../sideBar/page";
import { getSessionData, logout, viewSideMenuList } from "@/app/services/api";
import { useStore } from "./../../../store/index";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { menuItems } from "@/app/utils/constants";
import { toast } from "react-toastify";

const NavBar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [sidebar, SetSideBar] = useState(false);
  const [isProfile, SetProfile] = useState(false);
  const router = useRouter();
  const setSideBarList = useStore((state) => state.setSideBarList);
  const setMenuItemsList = useStore((state) => state.setMenuItemsList);
  const setCompanyProfile = useStore((state) => state.setCompanyProfile);
  const { isLogin, status_flag, userImage, favourites, cart } = useStore(
    (state) => state.session
  );
  const setIsLogin = useStore((state) => state.setIsLogin);
  const { menuItemsList } = useStore((state) => state.menuItems);
  const { isCart, isWishlist } = useStore((state) => state.propertyViewListing);

  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem("token");
      if (token) {
        getSessionData(token)
          .then((res) => {
            const d = res.data.data;
            setIsLogin(!!token, res);
            setMenuItemsList(d?.user_menu);
          })
          .catch((err) => {
            console.log(err);
            // toast.error(err.message || "Failed to fetch data");
          });
      }
    };
    checkToken();
  }, [status_flag, isLogin, isCart, isWishlist]);

  const handleLogout = () => {
    logout()
      .then((res) => {
        if (res.data.status) {
          localStorage.clear();
          setIsLogin(false);
        }
      })
      .catch((err) => {
        console.log(err);
        // toast.error(err.message || "Failed to fetch data");
      });
  };

  const handleScroll = () => {
    setScrolled(window.scrollY > 50);
  };

  const onProfileClose = () => {
    SetProfile(false);
  };

  const onProfileOpen = () => {
    SetProfile(!isProfile);
  };

  useEffect(() => {
    viewSideMenuList()
      .then((res) => {
        const d = res.data.data;
        setSideBarList(d?.data);
        setCompanyProfile(d?.company_profile);
      })
      .catch((error) => {
        console.log(error);
        // toast.error(error.message || "Failed to fetch data");
      });
  }, [isLogin]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  useEffect(() => {
    if (isProfile) {
      document.addEventListener("click", onProfileClose);
    } else {
      document.removeEventListener("click", onProfileClose);
    }
    return () => {
      document.removeEventListener("click", onProfileClose);
    };
  }, [isProfile]);

  const handleSideBarOpen = () => {
    SetSideBar(true);
  };

  const handleIconClick = () => {
    router.push("/");
  };

  return (
    <>
      <header
        id="header"
        className={`sticky-header mx-auto fixed left-0 w-full h-[74px] top-0 px-4 py-11 flex justify-around items-center z-30 ${
          scrolled ? "bg-white h-[82px]" : "bg-[#42494d4a]"
        }`}
      >
        <div className="2xl:w-[1435px] md:w-[1110px] flex justify-between  items-center w-full mx-auto">
          <div className="flex-shrink-0 cursor-pointer transition-transform duration-500 ease-in-out">
            <Image
              src={scrolled ? MenuFixed : MenuLogo}
              alt=""
              className="md:h-[36px] md:w-[36px] w-[28px] h-[28px]"
              onClick={handleSideBarOpen}
            />
          </div>
          <Image
            src={scrolled ? LogoFixed : Logo}
            alt=""
            className="md:h-[72px] md:w-[71px] w-[38px] h-[38px] cursor-pointer"
            onClick={handleIconClick}
          />

          <div className="flex">
            {isLogin ? (
              <div className="relative inline-block " onClick={onProfileOpen}>
                <Image
                  src={
                    userImage
                      ? `${process.env.NEXT_PUBLIC_STORAGE_URL}${userImage}`
                      : User
                  }
                  alt="user.png"
                  className="md:h-[66px] md:w-[66px] w-[40px] h-[40px] rounded-full cursor-pointer"
                  width={48}
                  height={48}
                />
                {isProfile ? (
                  <div
                    className="w-36 absolute z-10 mt-2  origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none 2xl:right-[-42px] lg:right-[-22px] -right-2"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="menu-button"
                    tabIndex={-1}
                  >
                    <div className="py-1" role="none">
                      {menuItemsList.map((item: any) => (
                        <Link
                          key={item.id}
                          href={item.link}
                          className="block px-4 py-2 text-sm text-[#0369a1] hover:bg-[#cfe5f1] text-center "
                          role="menuitem"
                          tabIndex={-1}
                          id={`menu-item-${item.id}`}
                          onClick={item.logout ? handleLogout : undefined}
                        >
                          {item.slug === "cart"
                            ? `${item.name} (${cart})`
                            : item.slug === "favourites"
                            ? `${item.name} (${favourites})`
                            : item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
            ) : (
              <div className="relative inline-block" onClick={onProfileOpen}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  fill={scrolled ? "#0670b1" : "white"}
                  className="color-change-svg md:w-[50px] h-[50px] w-[25px] size-10 cursor-pointer"
                >
                  <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z" />
                </svg>
                {isProfile ? (
                  <div
                    className="absolute z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none 2xl:right-[-52px] lg:right-[-22px] right-[-16px]"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="menu-button"
                    tabIndex={-1}
                  >
                    <div className="py-1" role="none">
                      {menuItems.map((item) => (
                        <Link
                          key={item.id}
                          href={item.href}
                          className="block px-4 py-2 text-center text-sm text-[#0369a1] hover:bg-[#cfe5f1] "
                          role="menuitem"
                          tabIndex={-1}
                          id={`menu-item-${item.id}`}
                        >
                          {item.text}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
            )}
          </div>
        </div>
      </header>
      {sidebar ? <SideBar SetSideBar={SetSideBar} /> : ""}
    </>
  );
};
export default NavBar;
