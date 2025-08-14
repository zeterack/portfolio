# Portfolio - Déploiement Docker

Ce projet utilise Docker et Docker Compose avec Traefik comme reverse proxy pour exposer le portfolio sur `portefolio.zeterack.fr`.

## 🏗️ Architecture

- **Frontend**: Application Angular servie par Nginx
- **Reverse Proxy**: Traefik avec SSL automatique (Let's Encrypt)
- **Monitoring**: Watchtower pour les mises à jour automatiques

## 🚀 Déploiement

### Prérequis

- Docker et Docker Compose installés
- Nom de domaine pointant vers votre serveur
- Ports 80 et 443 ouverts

### Déploiement rapide

```bash
# Cloner le projet
git clone <repository-url>
cd portfolio

# Lancer le déploiement
./deploy.sh
```

### Déploiement manuel

```bash
# Créer les répertoires nécessaires
mkdir -p traefik certs

# Créer le fichier ACME pour Let's Encrypt
touch traefik/acme.json
chmod 600 traefik/acme.json

# Construire et démarrer les services
docker-compose up -d --build
```

## 🔧 Gestion des services

### Commandes utiles

```bash
# Voir les logs du portfolio
docker-compose logs -f portfolio

# Voir les logs de Traefik
docker-compose logs -f traefik

# Redémarrer le portfolio
docker-compose restart portfolio

# Arrêter tous les services
./stop.sh
# ou
docker-compose down

# Mise à jour du portfolio
git pull
docker-compose up -d --build portfolio
```

### Surveillance des services

```bash
# Statut des conteneurs
docker-compose ps

# Ressources utilisées
docker stats

# Espace disque
docker system df
```

## 🌐 Accès aux services

- **Portfolio**: https://portefolio.zeterack.fr
- **Traefik Dashboard**: https://traefik.zeterack.fr
  - Utilisateur: `admin`
  - Mot de passe: `admin`

## 🔒 Sécurité

### SSL/TLS
- Certificats SSL automatiques via Let's Encrypt
- Redirection automatique HTTP → HTTPS
- Headers de sécurité configurés

### Authentification
- Dashboard Traefik protégé par authentification basique
- Accès aux logs restreint

## 🔧 Configuration

### Variables d'environnement

Modifiez le `docker-compose.yml` pour personnaliser :

- `zeterack@gmail.com` : Email pour Let's Encrypt
- `portefolio.zeterack.fr` : Votre nom de domaine
- `traefik.zeterack.fr` : Sous-domaine pour le dashboard

### Nginx

La configuration Nginx dans `nginx.conf` inclut :
- Compression Gzip
- Cache des assets statiques
- Headers de sécurité
- Support des routes Angular (SPA)

## 📊 Monitoring

### Watchtower
- Mise à jour automatique des conteneurs
- Vérification toutes les 5 minutes
- Nettoyage automatique des anciennes images

### Health Checks
- Endpoint de santé : `/health`
- Vérification Docker intégrée

## 🐛 Dépannage

### Problèmes courants

1. **Certificat SSL non généré**
   ```bash
   # Vérifier les logs Traefik
   docker-compose logs traefik
   
   # S'assurer que le domaine pointe vers le serveur
   nslookup portefolio.zeterack.fr
   ```

2. **Port 80/443 déjà utilisé**
   ```bash
   # Identifier le processus utilisant le port
   sudo netstat -tulpn | grep :80
   sudo netstat -tulpn | grep :443
   ```

3. **Build Angular échoue**
   ```bash
   # Nettoyer le cache npm
   docker-compose exec portfolio npm cache clean --force
   
   # Rebuilder
   docker-compose up -d --build portfolio
   ```

### Logs détaillés

```bash
# Tous les services
docker-compose logs

# Service spécifique avec timestamp
docker-compose logs -ft portfolio

# Dernières lignes
docker-compose logs --tail=50 traefik
```

## 📝 Notes de développement

- Le Dockerfile utilise un build multi-stage pour optimiser la taille
- Nginx sert les fichiers statiques avec cache optimisé
- Traefik gère automatiquement la découverte de services
- Configuration résiliente avec restart policies
