## LiteLens – Project Documentation (WIP)

### 1. High-level vision

- **Goal**: A lightweight, photography‑first social app (Instagram × EyeEm × Agora) focused on:
  - Finished photo posts (single images or small series).
  - Genuine connections and feedback within the photography community.
  - Minimal, fast, mobile‑first experience (iOS + Android).

### 2. Tech stack (current)

- **Client**: React Native with Expo (TypeScript).
  - Navigation: `@react-navigation/native`, `@react-navigation/bottom-tabs`.
  - Icons: `@expo/vector-icons` (`Ionicons`).
  - Safe areas: `react-native-safe-area-context`.
  - Platform tested: Android (Google Pixel 8 Pro, Android 16) and web via Expo.

### 3. Project structure (client)

- `mobile/`
  - `App.tsx`: Entrypoint, sets up `RootNavigator` and dark status bar.
  - `src/navigation/RootNavigator.tsx`:
    - Bottom tab navigator with screens:
      - `Feed`
      - `Explore`
      - `Create`
      - `Notifications`
      - `Profile`
  - `src/components/ScreenContainer.tsx`:
    - Wraps each screen in a single `SafeAreaView` (top/left/right edges) and inner `View`.
    - Uses a shared dark background color to avoid double insets and over‑extended top padding.
  - `src/theme/colors.ts`:
    - Shared design tokens:
      - Dark background: `#050509`.
      - Surfaces: `surface`, `surfaceElevated`.
      - Accent: warm **golden** primary for a photography / golden‑hour feel.
    - `spacing`, `radius`, `typography` primitives for consistent UI.
  - `src/models/types.ts`:
    - `User`, `ImageAsset`, `ExifData`, `Post`, `Comment`, `Challenge`.
  - `src/data/mockData.ts`:
    - Sample `users`, `posts`, `commentsByPostId`, and `challenges` for the prototype.
    - Uses Unsplash image URLs for reliable remote images.
  - `src/screens/FeedScreen.tsx`:
    - Main feed UI and interactions.
  - `src/screens/ExploreScreen.tsx`:
    - Simple explore view with featured challenges row and popular tag chips.
  - `src/screens/CreateScreen.tsx`:
    - Placeholder explaining the future upload workflow.
  - `src/screens/NotificationsScreen.tsx`:
    - Placeholder for activity and challenge updates.
  - `src/screens/ProfileScreen.tsx`:
    - Placeholder profile layout (avatar, name, handle, bio, future gallery).

### 4. Feed screen – current behavior

File: `mobile/src/screens/FeedScreen.tsx`

- **Header**:
  - App title: `LiteLens`.
  - Subtitle: explains this is the curated feed of photographers you follow.

- **Post card layout**:
  - Header:
    - Placeholder avatar circle.
    - Author display name and `@username`.
    - Location (or “Unknown location”).
  - Image:
    - Uses the first `ImageAsset` as hero (`aspectRatio: 4/5`).
    - Dark wrapper background to avoid flashing.
  - Body:
    - Title.
    - Short description (2 lines max).
    - Tags (first ~3), rendered as `#tag` line.
    - Dynamic stats:
      - `X appreciations • Y comments`.
      - Tapping this line also toggles the comments section.

- **Interactions (post actions row)**:
  - **Like**:
    - Text chip: `♡ Like` / `♥ Liked` with color change on active.
    - **Double‑tap on image** sets the post to liked (does not currently toggle off via double‑tap).
  - **Comment**:
    - Chip: `💬 Comment`.
    - Tapping toggles the comment section open/closed.
  - **Repost**:
    - Chip: `⤴ Repost`, toggles between normal and active color.
    - State is local only for now (no sharing logic yet).
  - **Save**:
    - Chip: `☆ Save` / `★ Saved`, toggles local saved state.
  - **Info (photo details)**:
    - Icon button: `information-circle-outline` / `information-circle`.
    - Tapping toggles visibility of the photo details block.

- **Photo details (EXIF + location)**:
  - Rendered under the caption when Info is active.
  - Shows available fields from `post.exif`:
    - `Camera`
    - `Lens`
    - `Aperture`
    - `Shutter Speed`
    - `ISO`
    - `Focal Length`
  - Also shows:
    - `Location` (from `post.location`) as part of the details block.

### 5. Comments – current behavior

- Backed by:
  - Initial mock comments from `commentsByPostId[post.id]`.
  - Local state (`localComments`) inside each `PostCard`.
- When comments are visible:
  - **Existing comments**:
    - Rendered as a list:
      - Author name (caption style, slightly bold).
      - Comment body (body text, 1–2 lines).
  - **New comment input**:
    - Multiline `TextInput` with placeholder: “Add a comment...”
    - Styled as a pill container above the post bottom.
    - **Send button** (paper plane icon):
      - Disabled when the input is empty/whitespace.
      - On send:
        - Creates a new `Comment` with a mock “current user”.
        - Appends it to `localComments`.
        - Clears the text input.
- **Comment count**:
  - Calculated as `localComments.length`.
  - Displayed in the stats line and updated as comments are added.
  - Tapping the stats line also toggles the comment section.

### 6. Explore screen – current behavior

File: `mobile/src/screens/ExploreScreen.tsx`

- Header: title + subtitle explaining discovery.
- Featured challenges:
  - Horizontal `FlatList` of `Challenge` items.
  - Each card:
    - Cover image with dark overlay.
    - Title.
    - Status label (`LIVE`, `UPCOMING`, etc.) in primary color.
- Popular tags:
  - Derived from mock post tags (first few unique tags).
  - Rendered as `#tag` chips with soft primary background.

### 7. Profile / Create / Notifications – current behavior

- All three are **scaffolds** with copy that explains their future purpose:
  - **Profile**:
    - Avatar placeholder, name, `@handle`, bio, and a card describing the future gallery.
  - **Create**:
    - Copy describing future flow: choose finished images, add EXIF and story, then publish.
  - **Notifications**:
    - Copy describing activity: appreciations, comments, follows, and challenge results.

### 8. Layout & device-specific notes

- **Safe area fix (Pixel 8 Pro / Android 16)**:
  - Issue: The top of the app appeared over‑extended (too much padding).
  - Cause: Nested `SafeAreaView`s in `ScreenContainer` effectively double‑applied top inset.
  - Fix:
    - Switched to a single `SafeAreaView` from `react-native-safe-area-context`.
    - Applied `edges={['top','left','right']}`.
    - Wrapped children in a plain `View`.

### 9. Git / GitHub notes

- There is a `.gitignore` inside `mobile/` that excludes:
  - `node_modules/`
  - Expo cache folders and common build artifacts.
- For GitHub web uploads:
  - `node_modules` should be deleted locally before drag‑and‑drop uploading, since the web UI does not respect `.gitignore`.
  - Anyone cloning the repo can run `npm install` inside `mobile/` to restore dependencies.

### 10. Next logical steps (not yet implemented)

- **Post detail screen**:
  - Full‑screen image, full caption, detailed EXIF, and full threaded comments.
- **Profile gallery**:
  - Grid of user posts, with the ability to pin featured work.
- **Backend/API**:
  - NestJS + Postgres backend for:
    - Auth.
    - Real users, posts, comments, and challenges.
    - File upload endpoints for images.
- **Real-time & notifications**:
  - Push notifications for comments, appreciations, and challenge results.


