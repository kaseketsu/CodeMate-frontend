"use client";
import React from "react";
import './index.css';
/**
 * 全局底部栏
 * @constructor
 */
export default function GlobalFooter() {
  const currentYear = new Date().getFullYear();
  return (
    <div className="global-footer">
      <div>© {currentYear} Made with hair</div>
      <div>by 程序员小花</div>
    </div>
  );
}
