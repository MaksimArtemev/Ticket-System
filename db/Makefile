make:
	-docker stop ticket-db
	-docker rm ticket-db
	docker build -t ticket-db .
	docker run --name ticket-db -d \
		-p 27017:27017 \
		--restart=always \
		ticket-db
	docker logs --follow `docker ps -aqf ancestor=ticket-db | head -n 1`

logs log:
	docker logs --follow `docker ps -aqf ancestor=ticket-db | head -n 1`

down:
	@CONTAINERS=$$(docker ps -q -f ancestor=ticket-db); \
	if [ -n "$$CONTAINERS" ]; then \
		for container in $$CONTAINERS; do \
			echo "Stopping container: $$container"; \
			docker stop $$container; \
			echo "Removing container: $$container"; \
			docker rm $$container; \
		done; \
	else \
		echo "No containers to stop or remove."; \
	fi
	# docker stop `docker ps -aqf ancestor=ticket-db | head -n 1`
	# docker rm `docker ps -aqf ancestor=ticket-db | head -n 1`