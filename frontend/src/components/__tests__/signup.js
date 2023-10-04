import React from "react";
import { render, fireEvent } from "@testing-library/react";
import  SignUp from "../signup";

test("Login renders without crashing", () => {
    render(< SignUp />);
  })
