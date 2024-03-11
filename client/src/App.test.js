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
  
  test("logs in successfully", async () => {
    axios.get.mockResolvedValueOnce({ data: { status: true, userType: "admin" } });
    render(<App />);
    const usernameInput = screen.getByPlaceholderText("Username");
    const passwordInput = screen.getByPlaceholderText("Password");
    const loginButton = screen.getByText("Login");
    fireEvent.change(usernameInput, { target: { value: "testuser" } });
    fireEvent.change(passwordInput, { target: { value: "testpassword" } });
    fireEvent.click(loginButton);
    await waitFor(() => {
      expect(screen.getByText("Successfully Logged in as testuser!")).toBeInTheDocument();
    });
  });

  test("displays uploaded PDFs", async () => {
    axios.get.mockResolvedValueOnce({ data: { data: [{ title: "Test PDF", pdf: "test.pdf", validationStatus: "pending" }] } });
    render(<App />);
    const loginButton = screen.getByText("Login");
    fireEvent.click(loginButton);
    await waitFor(() => {
      expect(screen.getByText("Test PDF")).toBeInTheDocument();
      expect(screen.getByText("Validation Status: pending")).toBeInTheDocument();
    });
  });
  test("logs out successfully", async () => {
    axios.get.mockResolvedValueOnce({ data: { status: true, userType: "admin" } });
    render(<App />);
    const usernameInput = screen.getByPlaceholderText("Username");
    const passwordInput = screen.getByPlaceholderText("Password");
    const loginButton = screen.getByText("Login");
    fireEvent.change(usernameInput, { target: { value: "testuser" } });
    fireEvent.change(passwordInput, { target: { value: "testpassword" } });
    fireEvent.click(loginButton);
    const logoutButton = screen.getByText("Logout");
    fireEvent.click(logoutButton);
    await waitFor(() => {
      expect(screen.getByText("Microsoft OpenAI Document Validation Service Login")).toBeInTheDocument();
    });
  });

});