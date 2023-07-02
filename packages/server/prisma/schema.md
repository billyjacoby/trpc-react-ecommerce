# DB Table View

## Item

id | name | description? | cost | photos | default_photo_index | number_in_stock
--- | --- | --- | --- | --- | --- | ---
ID | text | long text? | float | url [ ] | integer | integer

Items are intended to compose products and are not meant to be listed for sale on their own.

## Product

id | name | description | cost_extended? | price_to_consumer? | margin | photos | default_photo_index
--- | --- | --- | --- | --- | --- | --- | ---
ID | text | long text | float? | float? | float=0.35 | url [ ] | integer

Products will always be composed of one or more items. Products should have an associated PTC and a calculated cost. Cost should include the cost of all composed items along with any (optional) additional cost. Any additional cost that a product must include in the price will be listed as the `cost_extended`. PTC will be a value that is calculated by `([items.cost] + cost_extended) * margin` if there is no PTC value given.

For example:

- Product composed of a single item - cost is just that item cost plus the (optional) associated `cost_extended`
- Product composed of multiple items - cost is the aggregate of both item's cost plus the `cost_extended`
