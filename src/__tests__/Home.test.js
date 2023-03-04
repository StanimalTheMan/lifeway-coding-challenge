import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import Home from "../components/Home";

describe("Test my app", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test("makes api request after debounce 2 seconds since last time user stopped typing", async () => {
    const fakeData = {
      results: [
        {
          name: "Luke Skywalker",
        },
      ],
    };
    jest.spyOn(global, "fetch").mockImplementation(() => {
      return Promise.resolve({
        json: () => Promise.resolve(fakeData),
      });
    });
    render(<Home />);
    // probably bad that I am finding Searchbar child component in Home.test.js
    const searchbar = screen.getByTestId("searchbar");
    expect(searchbar).toBeInTheDocument();
    fireEvent.change(searchbar, { target: { value: "Luke" } });
    // act(() => jest.advanceTimersByTime(2000));
    act(() => jest.runAllTimers());

    // expect(global.fetch).toHaveBeenCalled();
    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));

    global.fetch.mockRestore();
  });
});
