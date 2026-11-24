# The data workspace

In this build kit the folder is called `data-workspace/`. Installed in a project it is called
`product-management/`. Same thing, two names: the kit uses a plainly-named folder, the engine
creates `product-management/` where the work happens.

Empty on purpose. This is where the Product Management agent's real work happens: the
recommendations it makes and the reasoning behind them, for a given product.

The engine creates this folder on `pman init` and never writes into it. Nothing in here is managed
by the engine, so nothing here is ever overwritten by `pman update` or removed as stale.

**There is no data template.** Plan v9 removed the register the other agents used to have — there
is no `product-management.yaml`, no `specs/`, no `changes/`, and no `config.yaml`. Those names are
not written by any code path. What goes in `product-management/` is the agent's own product work.

**`intent/knowledge-base/` is not part of this.** That folder holds the source material the mental
model was built from — the CIRCLES method, the RICE origin article, the SVPG product model
material, Teresa Torres, and Shape Up. It belongs to the mental model, not to a project's data
workspace, and it is never installed into a project. The agent does not read it at runtime; its
method is carried in the seven skills.
