"""Tests for report.py helpers."""

from report import summarize


def test_summarize_default_argument_not_mutated():
    # Calling summarize() repeatedly with the default argument must not
    # accumulate state across calls (py/modification-of-default-value).
    first = summarize()
    second = summarize()
    assert first == second == 0


def test_summarize_with_values():
    assert summarize([1, 2, 3]) == 6
