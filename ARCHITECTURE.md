# Architecture

## Structure

```
src/
├── core/
│   ├── domain/          # Business entities
│   ├── usecases/        # Application logic
│   └── ports/           # Interface contracts
├── adapters/            # Infrastructure implementations
├── infrastructure/di/   # Dependency injection
└── routes/             # HTTP layer
```

## Layers

**Domain** - Pure business entities and rules
**Use Cases** - Application logic orchestration
**Ports** - Interfaces for external dependencies
**Adapters** - Concrete implementations (Drizzle, better-auth, etc.)
**DI Container** - Wires dependencies together

## Usage

```typescript
import { container } from '$infrastructure/di/container';

const split = await container.createSplit.execute(data);
```

## Swapping Infrastructure

Create adapter implementing the port interface, update container. Business logic unchanged.

## Aliases

```
$core -> src/core
$adapters -> src/adapters
$infrastructure -> src/infrastructure
```
