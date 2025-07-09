"use client";

import Link from "next/link";
import { useState } from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import Image from "next/image";

import "./Header.css"

export default function Header() {
  const [expanded, setExpanded] = useState(false);

  return (
    <Navbar
      expand="lg"
      bg="white"
      variant="light"
      expanded={expanded}
      className="shadow-sm py-2"
      fixed="top"
    >
      <Container>
        <Navbar.Brand as={Link} href="/" className="d-flex align-items-center">
          <Image
            src="/logo/logo_black.png"
            alt="StockAnalyzer Logo"
            width={120}
            height={40}
            priority
          />
        </Navbar.Brand>

        <Navbar.Toggle onClick={() => setExpanded(!expanded)} />
        <Navbar.Collapse className="justify-content-end">
          <Nav className="me-3">
            <Nav.Link as={Link} href="/" className="fw-bold">
              Home
            </Nav.Link>
            <Nav.Link as={Link} href="/stocks" className="fw-bold">
              Stocks
            </Nav.Link>
            <Nav.Link as={Link} href="/crypto" className="fw-bold">
              Crypto
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
