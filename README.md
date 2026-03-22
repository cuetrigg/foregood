This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, set the enviroment var:

```bash
  NEXT_PUBLIC_API_ROOT_DOMAIN=
```

Second, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

For tenants:

Open [http://{tenant}.localhost:3000](http://{tenant}.localhost:3000) with your browser to see the result.

---

- ##Assumptions made

1. If `userSettings.custom_employee_category_required` is set to false there won't be custom categories.
2. `topVolunteersLimit` is for how many entries/rows show per page of the tables.
3. In the below data non member connections are total for that category and displaying it seems optional
unless you want to compare categories but the focus is maybe more the members of the category than the actual category.
```
[
    {
        "name": "Category Name/Business Unit",
        "connections": 92,
        "members": [
            {
                "name": "Example Person",
                "connections": 18,
                "imageUrl": "https://api.dicebear.com/..."
            }
        ]
    }
]
```
4. Data is already sorted in descending.

- ##Tradeoffs

1. All the components styles are placed in the `global.css` file instead of seperate component files to gain speed and simplicity over maintainability and complexity.
2. Most components are created within the table component files instead of being splitted into their own component files in order to gain the same andvantage as point 1.
3. Created client components wrappers for exmaple employeetable.tsx that wraps around employeetableclient.tsx for isolation and security over less boilerplate and simplcity.
4. Theme configs per tenants are individual json files as the client base growns this could become a nightmare, an optimal solution would be to return client specific theme data over api as json.

- ##Improvements with more time

1. More utilization of the frameworks tools like error, loading, forbidden, not-found pages on routes.
2. Better error handling and more user friendly error messages.
3. More stats like comparing individual members to others in terms of connections etc.
4. Enhanced ui for example make top 3 members in the table bolder or display their names with a griediant of the primary and secondary colors.
5. Maybe some fancy graphs and/or instead of using tables to display leaderboards create more custom components.
