import React from "react";
import { render, fireEvent } from "@testing-library/react";
import  Addtodo from "../addtodo";

test("Addtodo renders without crashing", () => {
    render(<Addtodo />);
  })


  

  test("Form submission should not call add method if input field is empty", () => {
    const add = jest.fn();
    const { getByTestId } = render(<Addtodo />);
    const btn = getByTestId("submit-btn");
    fireEvent.click(btn);
  
 
  });


  test("Form submission should go through successfully", () => {
    const add = jest.fn();
    const { container , getByTestId } = render(<Addtodo />);
    //const input = getByTestId("b-field")
    const input = container.querySelector("#transferFunds_to")
    const btn = getByTestId("submit-btn");
  
    fireEvent.change(input, { target: { value: "grocery" } });
    fireEvent.click(btn);
  
  
  
   
  });