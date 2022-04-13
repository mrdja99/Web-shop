import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { User } from "../../models/User";
import { Manufacturer } from "../../models/Manufacturer";
import { ProductType } from "../../models/ProductType";
import { Product } from "../../models/Product";
import { Order } from "../../models/Order";
import NavigationAdmin from "./NavigationAdmin";

interface Props {
  user: User;
}

function MainAdmin() {
  const [productToEdit, setProductToEdit] = useState<Product | null>(null);

  return (
    <>
      <NavigationAdmin />
      <Outlet/>
    </>
  );
}

export default MainAdmin;
