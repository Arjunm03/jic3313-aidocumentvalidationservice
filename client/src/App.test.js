import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import App from "./App";

jest.mock("axios");

describe("App", () => {
  test("renders login form when not logged in", () => {
    render(<App />);
    const loginForm = screen.getByText("Microsoft OpenAI Document Validation Service Login");
    expect(loginForm).toBeInTheDocument();
  });

 
});