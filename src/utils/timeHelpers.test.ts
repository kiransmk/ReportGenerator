// sum.test.js
import { describe, expect, test } from "vitest";
import {
  getDaysInMonth,
  getNextMonth,
  getPrevMonth,
  getMonthString,
  getMonthYearString,
  timeSince,
} from "./timeHelpers";

describe("timeHelpers", () => {
  test("getDaysInMonth", () => {
    const month = 9;
    const year = 2023;
    const result = new Date(year, month, 0).getDate();
    expect(getDaysInMonth(month, year)).toBe(result);
  });
  test("getNextMonth", () => {
    const month = 9;
    const year = 2023;
    const result = getNextMonth(month, year);
    expect(result[0]).toBe(month + 1);
  });
  test("getNextMonth when current is December", () => {
    const month = 12;
    const year = 2022;
    const result = getNextMonth(month, year);
    expect(result[0]).toBe(1);
    expect(result[1]).toBe(year + 1);
  });
  test("getPrevMonth", () => {
    const month = 9;
    const year = 2022;
    const result = getPrevMonth(month, year);
    expect(result[0]).toBe(month - 1);
  });
  test("getPrevMonth when current month is January", () => {
    const month = 1;
    const year = 2023;
    const result = getPrevMonth(month, year);
    expect(result[0]).toBe(12);
    expect(result[1]).toBe(year - 1);
  });
  test("getMonthString", () => {
    const month = 1;
    expect(getMonthString(month)).toBe("January");
  });
});
