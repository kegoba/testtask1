import React from "react";
import { render, fireEvent } from "@testing-library/react";
import  DisplayTodo from "../displaytodo";

test("Login renders without crashing", () => {
    render(<DisplayTodo />);
  })
