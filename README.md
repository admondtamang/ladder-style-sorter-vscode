# Import Ladder Sorter

Sort your import statements by length in ascending order - creating a beautiful ladder effect! 🪜

## Features

- **Auto-detect imports**: No need to select - just run the command and it finds your imports
- **Manual selection**: Or select specific import lines you want to sort
- **Keyboard shortcut**: Quick access with `Ctrl+Shift+L` (Windows/Linux) or `Cmd+Shift+L` (Mac)

## Usage

### Method 1: Auto-detect (Recommended)
1. Place cursor anywhere in your file
2. Press `Ctrl+Shift+L` (or `Cmd+Shift+L` on Mac)
3. Done! Your imports are now sorted

### Method 2: Manual selection
1. Select the import lines you want to sort
2. Press `Ctrl+Shift+L` (or `Cmd+Shift+L` on Mac)
3. Done!

### Method 3: Command Palette
1. Open Command Palette (`Ctrl+Shift+P` or `Cmd+Shift+P`)
2. Type "Sort Imports (Ladder Style)"
3. Press Enter

## Example

**Before:**
```typescript
import useSearchParams from '@/hooks/use-search-params';
import { Plus } from 'lucide-react';
import React, { useCallback, useState } from 'react';
import { ColumnDef } from '@tanstack/react-table';
```

**After:**
```typescript
import { Plus } from 'lucide-react';
import { ColumnDef } from '@tanstack/react-table';
import useSearchParams from '@/hooks/use-search-params';
import React, { useCallback, useState } from 'react';
```

## Installation

1. Copy all files to a new directory
2. Run `npm install`
3. Run `npm run compile`
4. Press F5 to open Extension Development Host
5. Test the extension!

To package and install:
```bash
npm install -g vsce
vsce package
code --install-extension import-ladder-sorter-1.0.0.vsix
```

## License

MIT