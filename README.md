# Real-time Chat Application using Socket.io, React.js, Node.js & Express.js
My goal was to build a Chat app that allows users to create room and do real-time communication and send emojis. 
This app is build using web sockets that Socket.io uses internally.

# Screenshot

![ss1](https://github.com/shagun2003/Chat_app/assets/134138604/5d29f1f8-4626-478a-8a64-572ad13a9101)

![ss2](https://github.com/shagun2003/Chat_app/assets/134138604/b061327b-c1a7-4c0c-8536-146cfaf61ff4)




## What I Learned

In this project, I learned how to set up a real-time chat application using React.js and Socket.io. I gained experience with handling WebSocket connections, managing chat rooms, and displaying messages in real time.


# The project structure is distributed into sections - 
* client 
* server
# The libraries included in this app are - 
* For the Server side it has the backend packages like -
  * Node.js 
  * Express.js(CORS middleware) 
  * Socket.io 
  * Nodemon
* For the Client side - 
  * React 
  * React-router  
  * Socket.io Client 

# Setting up the server-side
Most of the server-side setup is done requiring http module and then encapsulating it inside the socket.io. Using express makes setting up easier and allows us to use different middleware like the CORS middleware which has been used here.
All the handling of the users adding, removing, admin work,... everything is done on the server side. Also used nodemon module to automaate the serving.

# Setting up the client-side 
Firstly, the design is completely mine, asthetics is an important part that I always try to maintain in all of my projects.
The responsive design of the home page, changes when opened in a mobile-device.
Secondly, for React file structure two main components were created Join.js(Homepage) and Chat.js. All the other components were created on top of these main components
React-router is used for routing and apart from that for smooth scrolling react-scroll-to-bottom .
Both the client and the server is connected using socket.io, the socket.io-client at the client side and socket.io in the server side enables the user to send constant events. There is constant emmiting and listening of events between the client and the server.

# Features
* It shows the current users who are in the same room, 
* Send notifications when any user joins or left,

# Future Scope
* This app is currently session based and does not at any circumstances stores or monitors the Chat going in any room. 
* A column will be added to show all the online users.
* The ability to add images, videos and docs.
* To add a variety of emojis more easily
