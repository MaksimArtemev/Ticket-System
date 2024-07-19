make:
	-docker stop ticket-node
	-docker rm ticket-node
	docker build -t ticket-node .
	docker run --name ticket-node -d \
		-p 4000:4000 \
		--restart=always \
		ticket-node
	docker logs --follow `docker ps -aqf ancestor=ticket-node | head -n 1`

logs log:
	docker logs --follow `docker ps -aqf ancestor=ticket-node | head -n 1`

down:
	@CONTAINERS=$$(docker ps -q -f ancestor=ticket-node); \
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
	# docker stop `docker ps -aqf ancestor=ticket-node | head -n 1`
	# docker rm `docker ps -aqf ancestor=ticket-node | head -n 1`