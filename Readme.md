This apps provides key data for those who are searching for new customers,
businesses and social media profiles

Here are 4 step process involved:

1. Inputs your data to Google maps and searches for search keywords

2. Retrieves Google maps DOM tree and copies all relative values:

   - Bussiness name
   - Website

3. Goes to each business websites and searches for:

   - Email
   - Facebook Page
   - Instagram Page

   **Regular expression is used to find values on each website**

4. If no email found on the bussiness page and/or found Facebook page,

   - Searches for email on facebook

5. Returns all data found to your Window

6. Creates text file with all search values in the "marketing data" folder in the same directory for your convinience.

Input values as shown on this picture:

![App Workflow](./src/images/app_workflow.png)

Results with scanned searches should look like this:

![App Results](./src/images/app_results.png)

NOTE: FOR PRIVATE USE ONLY.

**NOTE: This app is for private use only. Unauthorized use or distribution of the collected data is strictly prohibited.**
