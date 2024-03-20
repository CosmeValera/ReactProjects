# GRAFANA and DOCKER
## Docker
- Watch processes
```sh
docker ps -a
```
- Remove container `grafana`
```sh
docker stop grafana
docker rm grafana
```
- Create container `grafana`
```sh
docker run -d --name=grafana -p 3122:3000 grafana/grafana-oss
```
- Start a container `grafana`
```sh
docker start grafana
```
- Execute a container `grafana`
```sh
docker exec -it grafana /bin/bash
```

### Docker Grafana

To be able to change a file to compile it we will need tu execute the container with privileges:
```bash
docker exec -it  -u 0 grafana bash
cd conf
sed -i '/allow_embedding = false/c\allow_embedding = true' defaults.ini
```

### Windows Grafana
Doing it With Windows installer you have to go here: 
`C:\Program Files\GrafanaLabs\grafana\bin` and run `grafana-server.exe`