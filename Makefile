COMMAND := $(firstword $(MAKECMDGOALS))
ifneq (,$(wildcard .env))
	include .env
	export
endif

PROJECT ?= purrtun-frontend
ENV ?= dev
ENV_CLEAN := $(subst ",,$(strip $(ENV)))
ifeq ($(ENV_CLEAN),prod)
COMPOSE := docker compose -p $(PROJECT) -f docker/docker-compose.yml -f docker/docker-compose.prod.yml
else
COMPOSE := docker compose -p $(PROJECT) -f docker/docker-compose.yml
endif

.PHONY: build up upd down restart logs vue shell

build:
	@$(COMPOSE) build

up:
	@$(COMPOSE) up

upd:
	@$(COMPOSE) up -d

down:
	@$(COMPOSE) down

restart:
	@$(COMPOSE) restart

logs:
	@$(COMPOSE) logs -f

vue shell:
	@$(COMPOSE) exec vue sh

%:
	@:
