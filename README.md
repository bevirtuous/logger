# @virtuous/logger

**Logger** is a simple but effective logging engine for JavaScript applications.

## Installation

```bash
npm install --save @virtuous/logger
```

## Usage

### The main logger

**ES2017** (prefered)

```js
import { logger } from '@virtuous/logger';

logger.log(/* custom log message */);
logger.warn(/* custom warning message */);
logger.error(/* custom error message */);
```

**CommonJS** (e.g. for usage in Node.js applications)

```js
const logger = require('@virtuous/logger').logger;

logger.log(/* custom log message */);
logger.warn(/* custom warning message */);
logger.error(/* custom error message */);
```

### The grouped log

Other than the main logger, this function can't be used in an Node.js environment. It is only meant to be used in a browser.

```js
import { group } from '@virtuous/logger';

group(/* message, content, actionColor */);
```