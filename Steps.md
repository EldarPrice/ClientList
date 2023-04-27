```diff

!!! BUSINESS_SEARCH_ENGINE !!!

===============
!  Raw info
===============

- Retrieving Google maps DOM tree

======================
! Basic Functionality
======================

- [ sdf] Lawyer
Open Google maps
Search for keyword => lawyer, private gym etc.
Go to website (if any)
Website has email address
Search for instagram+.com
If followers<500 then add to layers list
&&
Add email address to list

- [ ] Interior design
- [ ] Private gym
- [ ] Architector
- [ ] Construction
- [ ] Remodeling
- [ ] Accountant
- [ ] CPA

-------------------------------------------

=============
!  Steps:
=============

Copy website link once clicked

! Development Steps:

Search in lawyers website:
- [ ] Search for ‘@‘ sign and ending with  ‘.’(dot) plus three letters, example:
Jordan@hernandezlawfirmtx.com
- [ ] Use regex to find match
- [ ] If match found => copy whole word

! Completed:

- frontend app types info and sends input values in query
- backend recieves request and pass values to puppeteer to find info
- data returns from puppeteer as json
- sends back to front-end
- front-end parses data, maps through it and displays to user interface

! Next steps:

1. Make sure that data for search info passed correctly to back-end and recieved to front
2. Handle getAttribute error coming from puppeteer
3. Put puppeteer in try/catch block maybe, Or throw error from Express-async-errors

4. Create axios get request to further analyze data and find 3 things:
-   email
-   facebook
-   instagram

6. Analyze facebook and get emails. Only If not found on main page.
7. Save values in localStorage and add each values on each Step.

8. Create front interface to select needed search values from axios and pass them dinamically to back end.

9. Add checkBoxes to each values on front-end and button on top to select or deselect ALL!!

10. Create pages and amount of shown per page(optional)
-   Maybe input value with number selection
-   Then take that value and pass as limit values shown on the page
-   Maybe do the same thing for analyze further items in the list





```
