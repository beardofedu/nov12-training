"""INTENTIONALLY INSECURE report helper used for CodeQL and code quality demos."""

import os
import sqlite3
import subprocess

from flask import Flask, request

app = Flask(__name__)


@app.route("/orders")
def orders():
    # DEMO (CodeQL): SQL injection — py/sql-injection
    customer = request.args.get("customer")
    conn = sqlite3.connect("orders.db")
    rows = conn.execute("SELECT * FROM orders WHERE customer = '" + customer + "'").fetchall()
    return {"rows": rows}


@app.route("/export")
def export():
    # DEMO (CodeQL): command injection — py/command-line-injection
    fmt = request.args.get("format")
    subprocess.call("generate-report --format " + fmt, shell=True)
    return "ok"


def summarize(values=[]):
    # DEMO (Code quality): mutable default argument — py/modification-of-default-value
    values.append(0)
    total = 0
    unused_count = len(values)  # DEMO (Code quality): unused local variable
    for v in values:
        total = total + v
    return total


def read_config(path):
    # DEMO (Code quality): bare except swallows every error — py/catch-base-exception
    try:
        with open(os.path.expanduser(path)) as handle:
            return handle.read()
    except:
        pass
