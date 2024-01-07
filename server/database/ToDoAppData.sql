CREATE TABLE "toDoList" (
	"id" SERIAL PRIMARY KEY,
	"Task" VARCHAR (250) NOT NULL,
	"Description" VARCHAR (255) NOT NULL,
	"Status" BOOLEAN DEFAULT false
);

INSERT INTO "toDoList" 
	("Task", "Description") 
VALUES 
	('Finish homework', 'Complete coding challenge for To-Do app'),
	('Exercise', 'Go for a 60 minute workout'),
	('Buy Groceries', 'Go to the store and buy weekly groceries');
	
SELECT * FROM "toDoList";

UPDATE "toDoList" SET "Description" = 'finish part 1 of weekend full stack app' WHERE "id" = '4';

DELETE FROM "toDoList" WHERE "id" = '4';