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

  test("renders upload form when logged in", () => {
    render(<App />);
    const loginButton = screen.getByText("Login");
    fireEvent.click(loginButton);
    const uploadForm = screen.getByText("Upload PDF for Document Validation Service");
    expect(uploadForm).toBeInTheDocument();
  });

  
});