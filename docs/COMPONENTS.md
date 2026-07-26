# Components

> Project Altitude Components
>
> Version: 0.1 (MVP)

---

# Overview

Components are reusable building blocks that create a consistent experience across Project Altitude.

Every component should:

- Solve a single problem
- Be reusable
- Behave consistently
- Follow the Design System

---

# Button

Buttons trigger user actions.

## Variants

- Primary
- Secondary
- Ghost
- Text
- Icon

## States

- Default
- Hover
- Pressed
- Focused
- Disabled
- Loading

## Usage

Use one Primary button per screen whenever possible.

Examples

- Continue
- Book Flight
- Confirm Payment

---

# Input

Used to collect user information.

## Types

- Search
- Text
- Email
- Phone
- Number

## States

- Default
- Focus
- Filled
- Error
- Disabled

---

# Search

Search is the primary interaction pattern within Project Altitude.

## Variants

- Expanded
- Collapsed
- Active
- Loading
- Empty
- Results

## Used For

- Airport Search
- Destination Search

---

# Card

Cards represent meaningful information.

## Variants

- Destination Card
- Flight Card
- Recommendation Card
- Journey Card

Cards should never become dashboards.

---

# List

Lists display collections of information.

## Variants

- Airport List
- Flight List
- Destination List

Lists should remain easy to scan and avoid unnecessary separators.

---

# Calendar

Used for selecting travel dates.

## Variants

- Single Date
- Round Trip
- Flexible Dates

Additional information such as fare trends may be layered on top without replacing the calendar.

---

# Price Histogram

Visualises fare trends.

## Usage

- Cheapest dates
- Price comparison
- Flexible travel

This component supplements the calendar.

---

# Chip

Used to communicate short pieces of information.

## Variants

- Best Value
- Cheapest
- Fastest
- Refundable
- Direct

Chips should be concise and non-interactive unless filtering.

---

# Badge

Highlights status.

## Variants

- Success
- Warning
- Error
- Information

Badges communicate state rather than actions.

---

# Bottom Navigation

Primary navigation across the application.

## Items

- Explore
- Trips
- Saved
- Account

Maximum of five items.

---

# App Bar

Provides page-level navigation.

## Elements

- Back
- Close
- Title
- Actions

Only include actions relevant to the current screen.

---

# Bottom Sheet

Preferred pattern for selection workflows.

## Used For

- Airport Selection
- Passenger Selection
- Cabin Class
- Filters
- Fare Details

Supports:

- Collapsed
- Half Expanded
- Fully Expanded

---

# Modal

Reserved for confirmation and interruption.

## Examples

- Cancel Booking
- Discard Changes
- Delete Passenger

Avoid using modals for navigation.

---

# Dialog

Used when immediate user confirmation is required.

Should always provide:

- Primary Action
- Secondary Action

---

# Toast

Displays lightweight feedback.

## Examples

- Saved
- Copied
- Booking Updated

Should disappear automatically.

---

# Alert

Communicates important information.

## Types

- Success
- Warning
- Error
- Information

Alerts require user attention.

---

# Tooltip

Provides contextual help.

Use sparingly.

Never rely on tooltips to explain essential functionality.

---

# Accordion

Reveals secondary information.

## Examples

- Fare Rules
- Baggage Details
- Cancellation Policy

Collapsed by default.

---

# Tabs

Used to switch between related content.

## Examples

- Cheapest
- Fastest
- Best Value

Limit to 2–5 tabs.

---

# Stepper

Displays progress through a multi-step flow.

## Examples

- Search
- Passenger Details
- Payment
- Confirmation

Use only when progress benefits the user.

---

# Skeleton Loader

Represents content while loading.

## Variants

- Card
- List
- Flight
- Destination

Prefer skeletons over spinners whenever possible.

---

# Empty State

Appears when no content is available.

Every empty state should include:

- Explanation
- Next action

---

# Error State

Displayed when an operation cannot be completed.

Should include:

- What happened
- What users can do next

Avoid technical language.

---

# Component Rules

Every component should:

- Solve one problem.
- Be reusable.
- Support all required states.
- Follow Design Tokens.
- Follow Accessibility guidelines.

Before creating a new component, check whether an existing component can solve the same problem.