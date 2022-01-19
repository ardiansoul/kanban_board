import { render, screen } from "@testing-library/react";
import App from "./App";
import { Navbar } from "./components";

test("renders learn react link", () => {
  render(<App />);
  const { getByText } = screen;

  expect(getByText("Board note")).toBeInTheDocument();
});

test("renders Navbar", () => {
  let title = "Board note";
  render(<Navbar title={title} />);
  const { getByText } = screen;

  expect(getByText(title)).toBeInTheDocument();
});
