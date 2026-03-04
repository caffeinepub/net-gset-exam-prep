# NET/GSET Exam Prep Portal

## Current State
New project. No existing code.

## Requested Changes (Diff)

### Add
- Landing page with hero section introducing NET/GSET exam prep
- Two main sections: Paper 1 (Teaching Aptitude & Research Methodology) and Paper 2 (Education Subject)
- Unit-wise sidebar for study notes navigation per paper/subject
- PYQ (Previous Year Questions) PDF download area, organized by year and paper
- Study notes viewer with unit-based content
- Mobile-responsive layout with hamburger menu for sidebar on mobile
- Static sample content for units and PYQs

### Modify
- Nothing (new project)

### Remove
- Nothing (new project)

## Implementation Plan

### Backend
- Store paper sections (Paper 1, Paper 2) with metadata
- Store units per paper with title and content (study notes)
- Store PYQ entries with year, paper name, and download URL
- Provide query APIs: get papers, get units by paper, get PYQs by paper/year

### Frontend
- App shell: top navbar with logo, paper tabs (Paper 1 / Paper 2), mobile hamburger
- Sidebar: unit list for selected paper, collapsible on mobile
- Main content area:
  - "Study Notes" tab: displays selected unit's content
  - "PYQs" tab: grid of downloadable PDF cards filtered by selected paper
- Landing/home view before a paper is selected
- Sample seed data for units (Teaching Aptitude, Research Methodology, etc.) and PYQs (2019–2024)
