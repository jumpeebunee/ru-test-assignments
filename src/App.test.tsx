import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { describe, it } from "vitest";
import { store } from "./app/store";
import App from "./App";
import BaseConvert from "./components/BaseConvert";
import ConverterValue from "./components/ConverterValue";

describe("BaseConvertComponent", () => {
  it("Is working", () => {
    render(
      <BaseConvert baseSymbol={"uah"} equalSymbol={"rub"} equalValue={0.03} />
    );
    const convertation = screen.getByTestId("convertation");
    expect(convertation).toBeInTheDocument();
  });
});
describe("InputTesting", () => {
  it("Opens Modal", () => {
    render(<ConverterValue />);
  });
});
