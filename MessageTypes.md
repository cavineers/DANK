# Message Types for DANK

## Preface
When in communication through the WebSocket protocol, information will be shared between the client and the server. This document outlines the structure of the message being sent and the type of messages and it's corresponding data structure that may be sent in unidirectional or bidirectional communication.

## Usage

The first two characters should be a numerical value and a member of the list [Types](#Types) then a semicolon (`;`), finally followed immediately by the raw string of the content being transferred in the corresponding message type.

Example:

`06;Swerve Chassis`

In this example, the `06` refers to the data type [Name](#06-Name). Separated by a semicolon, the content of the message follows. The result of this example is a message being sent from the server to the client informing the client of the name of the robot that the dashboard has connected to.

## Type Structure

The structure of the types is as follows:

`name` - The name of the message type.

`TypeName` - The member of the Types enum.

`description` - General description of the message.

`direction` - `bidirectional`, `client bound`, or `server bound` are the possible directions in which the message can be sent.

`content` - The expected content found after the `;`, and gathered after being parsed.

## Types

### 00-Ping

Name: *Ping*

TypeName: `PING`

Description: *A request the other party to return a [Pong](#01-Pong) message. Used to check if the client/server are connected and both are receiving messages.*

Direction: `bidirectional`

Content: *The content of this message is never read by the client or the server.*

### 01-Pong

Name: *Pong*

TypeName: `PONG`

Description: *This is a message returned at the result of a [ping](#00-Ping) message.*

Direction: `bidirectional`

Content: *The content of this message is never read by the client or the server.*

### 02-Layout

Name: *Layout*

TypeName: `LAYOUT`

Description: *This is the layout that should be displayed by the dashboard when it connects to the robot.*

Direction: `client bound`

Content: *v3Layout*

### 03-Message

Name: *Message*

TypeName: `MESSAGE`

Description: *This is just a general message to be printed by either party.*

Direction: `bidirectional`

Content: *A string of the message.*

### 04-Vision

Name: *Vision*

TypeName: `VISION`

Description: *An array of vision data that is sent to the robot.*

Direction: `server bound`

Content: *It should follow the vision schema of the defined year.*

### 05-Year

Name: *Robot Year*

TypeName: `YEAR`

Description: *Reports the robot year to the client.*

Direction: `client bound`

Content: *Numerical year, format: YYYY*

### 06-Name

Name: *Robot Name*

TypeName: `NAME`

Description: *Reports the robot name to the client.*

Direction: `client bound`

Content: *Name is string format*

### Template

Name: **

TypeName: ``

Description: **

Direction: `bidirectional` `client bound` `server bound`

Content: **