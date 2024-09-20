import React, { useState, useEffect } from 'react';

export default function formatTime(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const diff = date - now;

  if (diff < 0) {
    return "Date is in the past";
  }

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return `${days} day${days > 1 ? 's' : ''} and ${hours % 24} H`;
  } else {
    return `${hours % 24}:${minutes % 60}:${seconds % 60}`;
  }
}