import React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import { TransferPage, TransferConfirmationPage, TransferSuccessPage } from "../pages";

export enum paths {
  transferencia = "/transferencia",
  transferencia_confirmar = "/transferencia/confirmar",
  transferencia_exitosa = "/transferencia/exitosa",
}

export default createBrowserRouter([
    {
      path: paths.transferencia,
      element: <TransferPage />,
    },
    {
      path: paths.transferencia_confirmar,
      element: <TransferConfirmationPage />,
    },
    {
      path: paths.transferencia_exitosa,
      element: <TransferSuccessPage />,
    },
    {
      path: "/",
      element: <></>,
    }
  ]);