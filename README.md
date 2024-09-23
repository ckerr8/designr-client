# Designr

## Overview

What is your app? Give a brief description in a couple of sentences.
  
    Graphic Design project/asset management application

### Problem Space

Why is your app needed? Give any background information around any pain points or other reasons.

    Problem: Organizing visual assets and preparing them for use can be just as time consuming as the actual design process.

    Freelance graphic designers use a lot of different assets. They are designing logos, social media reels, pamphlets, posters, banners, infographics, and landing pages. All These projects require different files types (.svg, .doc, .png, etc.) and different tools to manipulate them. Overall, a lot of time is spent setting up and organizing files.

    Other project management tools on the market focus on design agencies and facilitating collaboration betweeen designers, project managers, and clients.

    Other asset management tools are focused on specific types of assets (i.e images, text, video) and/or they store assets remotely. Designr will allow users to easily organize and use their assets on their local device.

    This app is inspired by the time I was hired by a Business Improvement Area that represented over 300 small businesses.

### User Profile

Who will use your app? How will they use it? Add any special considerations that your app must take into account.

    Freelance Graphic Designers

### Features

List the functionality that your app will include. These can be written as user stories or descriptions with related details. Do not describe _how_ these features are implemented, only _what_ needs to be implemented.

    Asset management system

    >Assets are organized by different keywords
        -content type (i.e video, photo, vector, audio)
        -Client name
        -Project Name

    Assets can be exported onto users local device in an organized manner

## Implementation

### Tech Stack

List technologies that will be used in your app, including any libraries to save time or provide more functionality. Be sure to research any potential limitations.

    Express
    Node.js
    React + Vite
    Bootstrap
    SQL

### APIs

List any external sources of data that will be used in your app.

    none for this sprint

### Sitemap

List the pages of your app with brief descriptions. You can show this visually, or write it out.

> All projects

    Filter
        -By deadline
        -By # of tasks

> All Assets

    Filters
        -Assets by Client
        -Assets by project
            Assets by task

    Asset detail
        -asset type
        -client name
        -associated projects/tasks

### Mockups

Provide visuals of your app's screens. You can use pictures of hand-drawn sketches, or wireframing tools like Figma.

Unstyled wireframes:
![Project view](Projects-view.png)
![Project detail](Project-detail.png)
![Project Task detail](task-detail.png)

![Client view](Clients-view.png)
![Client Detail](Client-details.png)

![Asset View](Asset-detail.png)
![Asset Detail](Asset-detail.png)

Note: final project wil be built for desktop for presentation and components will be styled 

### Data

Describe your data and the relationships between the data points. You can show this visually using diagrams, or write it out.

![alt text](<Screenshot 2024-09-11 at 1.54.10 PM.png>)

### Endpoints

List endpoints that your server will implement, including HTTP methods, parameters, and example responses.

    /assets/assetId
        Returns a list of all assets

        example: [
  {
    "Key": "a452a4e6",
    "Design Asset Category": "photo",
    "Project": "f5544efa",
    "Task": "4c8afd49",
    "Client": "c02ba545",
    "Name": "Design Asset 1",
    "Description": "This is placeholder text for Design Asset 1 that you can replace with your data.",
    "Image": "https://static.thenounproject.com/png/223623-200.png"
  }
    {
    "Key": "a452a1e6",
    "Design Asset Category": "audio",
    "Project": "f5544efa",
    "Task": "4c8afd49",
    "Client": "c02ba545",
    "Name": "Design Asset 2",
    "Description": "This is placeholder text for Design Asset 1 that you can replace with your data.",
    "Image": "https://static.thenounproject.com/png/223623-200.png"
  }
        ]


    /assets/assetId
         Returns detailed info on one asset 

    example:
  {
    "Key": "a452a1e4",
    "Design Asset Category": "image",
    "Project": "f5544efa",
    "Task": "4c8afd49",
    "Client": "c02ba545",
    "Name": "Design Asset 1",
    "Description": "This is placeholder text for Design Asset 1 that you can replace with your data.",
    "Image": "https://static.thenounproject.com/png/223623-200.png"
  }


    /projects/
        Returns a list of all projects

        example:
[
 {
    "Key": "8d9ca3ab",
    "Owner": "c4810838",
    "Client": "A Visual Feast",
    "Name": "This is placeholder text for Project 1 that you can replace with your data.",
    "Description": "This is placeholder text for Project 1 that you can replace with your data.",
    "Image": "https://static.thenounproject.com/png/21345-200.png",
    "Deadline": "8/2/2024",
    "Price": "$310.00"
  },
   {
    "Key": "8d9ca3ab",
    "Owner": "c4810838",
    "Client": "A Visual Feast",
    "Name": "This is placeholder text for Project 1 that you can replace with your data.",
    "Description": "This is placeholder text for Project 1 that you can replace with your data.",
    "Image": "https://static.thenounproject.com/png/21345-200.png",
    "Deadline": "8/2/2024",
    "Price": "$310.00"
  }
  ]

    /projects/projectId
        Returns a single project item and its associated tasks

        example:
{
    "Key": "8d9ca3ab",
    "Owner": "c4810838",
    "Client": "A Visual Feast",
    "Name": "This is placeholder text for Project 1 that you can replace with your data.",
    "Description": "This is placeholder text for Project 1 that you can replace with your data.",
    "Image": "https://static.thenounproject.com/png/21345-200.png",
    "Deadline": "8/2/2024",
    "Price": "$310.00"
  }

    /projects/projectId/tasks
        Returns a list of tasks associated with a project
example:

 [
  {
    "Key": "cabecf3d",
    "Project": "9eac3327",
    "Task Category": "02628dec",
    "Name": "Task 1",
    "Description": "This is placeholder text for Task 1 that you can replace with your data.",
    "Status": "Complete"
  },
  {
    "Key": "a2be6883",
    "Project": "76d57fcd",
    "Task Category": "c3afdd25",
    "Name": "Task 2",
    "Description": "You can edit this temporary text for Task 2 when you are finished designing your app.",
    "Status": "Complete"
  }
]

    /projects/projectId/tasks/taskId
        Returns a single task associated with a project

        example
{
    "Key": "cabecf3d",
    "Project": "9eac3327",
    "Task Category": "02628dec",
    "Name": "Task 1",
    "Description": "This is placeholder text for Task 1 that you can replace with your data.",
    "Status": "Complete"
  }

    /clients
        Returns a list of clients 

        example:
        [
  {
    "Key": "17cf97b4",
    "Name": "Wondrous Waffles",
    "Photo": "https://static.thenounproject.com/png/61360-200.png",
    "Email": "client1@example.com",
    "Phone Number": "1-206-555-1000",
    "Work Address": "12345 El Monte Road, Los Altos Hills"
  },
  {
    "Key": "f752213f",
    "Name": "Quirky Quokkas",
    "Photo": "https://static.thenounproject.com/png/112898-200.png",
    "Email": "client2@example.com",
    "Phone Number": "1-206-555-1001",
    "Work Address": "201 Almond Avenue, Los Altos"
  }
]

    /clients/clientId
        Returns a single client with associated visual assets and projects
   
    example:
{
    "Key": "17cf97b4",
    "Name": "Wondrous Waffles",
    "Photo": "https://static.thenounproject.com/png/61360-200.png",
    "Email": "client1@example.com",
    "Phone Number": "1-206-555-1000",
    "Work Address": "12345 El Monte Road, Los Altos Hills"
  }

## Roadmap

Scope your project as a sprint. Break down the tasks that will need to be completed and map out timeframes for implementation working back from the capstone due date.

## Create Server Side
1. Design API endpoints with paths and responses
2. Identify needed endpoints, divide endpoints into separate router modules.
3. Use static mock data for endpoint responses, test using
Postman
4. Begin Implementing Database/Models
 6. Build Controllers that will use the Models  to gather data from back-end services
7. Routes use Controllers to pass request information, and receive data for the response
## Complete above by Sept 14

## Create Client side
1. Mock up the UI in HTML
2. Break the mockup into separate static React
Components
3. Identify props that are needed for each component
4. Identify stateful components and mock up state
5. Add needed handlers for modifying state6. Begin connecting Front -end to Back-end and ensuring that the data received from APIs will match the data

## Complete above by Sept 20

---

## Future Implementations

Your project will be marked based on what you committed to in the above document. Here, you can list any additional features you may complete after the MVP of your application is built, or if you have extra time before the Capstone due date.

    I would like to integrate the following post-graduation:
        -Adobe Creative Cloud (save colour palettes, fonts, layouts, templates)
        -Outlook/Google Workspace (automate emails, remote storage)
        -Clickup/Jira (project management)
        -Gemini (Input=reference from client
                Output= Design styles[Art Novouea, Swiss Design, Grunge] + artist reccomendations, colour reccomendations, font reccomendations, etc.)
