build: client server

# build client
client: 
	cd client && make build
# build server
server: 
	cd server && make build

run:
	docker-compose up

stop:
	docker-compose down