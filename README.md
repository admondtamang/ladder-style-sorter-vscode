# Import Ladder Sorter

Sort your import statements by length in ascending order - creating a beautiful ladder effect! 🪜

### Command Palette

1. Open Command Palette (`Ctrl+Shift+P`)
2. Type "Sort Imports (Ladder Style)"
3. Press Enter

## Example

**Before:**

```typescript
import useSearchParams from "@/hooks/use-search-params";
import { Plus } from "lucide-react";
import React, { useCallback, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
```

**After:**

```typescript
import { Plus } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import React, { useCallback, useState } from "react";
import useSearchParams from "@/hooks/use-search-params";
```

## License

MIT
