make:
	-docker stop ticketsystem
	-docker rm ticketsystem
	docker build -t ticketsystem .
	docker run --name ticketsystem -d \
		-v ${CURDIR}:/usr/src/app \
		-p 3000:3000 \
		--restart=always \
		ticketsystem
	docker logs --follow `docker ps -aqf ancestor=ticketsystem | head -n 1`

logs log:
	docker logs --follow `docker ps -aqf ancestor=ticketsystem | head -n 1`

down:
	@CONTAINERS=$$(docker ps -q -f ancestor=ticketsystem); \
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
	# docker stop `docker ps -aqf ancestor=ticketsystem | head -n 1`
	# docker rm `docker ps -aqf ancestor=ticketsystem | head -n 1`