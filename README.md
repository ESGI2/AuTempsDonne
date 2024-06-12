
# 🕰️ Au Temps Donné 🤝

## Description

"**Au Temps Donné**" est une application web conçue pour l'association du même nom, qui vise à aider les personnes dans le besoin en organisant des maraudes, des cours et en fournissant une assistance personnalisée. Cette application sert de vitrine pour l'association et offre un espace interactif pour les bénéficiaires, les bénévoles et les administrateurs. Les administrateurs ont un contrôle complet sur l'organisation via le back-office, y compris la gestion des stocks, des plannings des membres, des livraisons, des maraudes, etc.

## Fonctionnalités

### 🖥️ Front-office

- Interface utilisateur conviviale pour les visiteurs et les membres de l'association.
- Affichage des services proposés par l'association.
- Informations sur les événements à venir, les projets en cours et les actualités.
- Accès aux fonctionnalités spécifiques pour les bénéficiaires et les bénévoles.

### 🖥️ Back-office

- Gestion complète des stocks, des plannings, des livraisons et des maraudes.
- Contrôle des utilisateurs et des permissions.
- Génération de rapports et statistiques pour suivre l'activité de l'association.

### 📩 Application de Ticketing

- Ouverture de tickets par les bénéficiaires ou les bénévoles pour contacter les administrateurs.
- Vue sur les tickets en cours, fermés et possibilité de répondre via des emails automatisés.

### 📱 Application Mobile

- Planning pour les bénévoles.
- Système de QR code pour gérer les stocks pendant les maraudes/livraisons.
- Gestion d'un jeton NFC pour attester du passage à certains endroits.

## Technologies Utilisées

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![MySQL](https://img.shields.io/badge/mysql-4479A1.svg?style=for-the-badge&logo=mysql&logoColor=white)

### 🖥️ Front-office (React)

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white)
![Stripe](https://img.shields.io/badge/Stripe-626CD9?style=for-the-badge&logo=Stripe&logoColor=white)

- **Dépendances**:
  - React, React-DOM
  - React-Router
  - Bootstrap, TailwindCSS
  - FullCalendar
  - Stripe

### 🖥️ Back-office (Node.js avec Express)

![Express](https://img.shields.io/badge/Express%20js-000000?style=for-the-badge&logo=express&logoColor=white)
![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=Sequelize&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white)
- **Dépendances**:
  - Express
  - Sequelize (ORM pour la base de données)
  - Moment.js
  - JWT pour l'authentification
  - Nodemailer pour l'envoi d'emails

### 📩 Application de Ticketing (Python)


![Python](https://img.shields.io/badge/Python-FFD43B?style=for-the-badge&logo=python&logoColor=blue)
![Qt](https://img.shields.io/badge/Qt-41CD52?style=for-the-badge&logo=qt&logoColor=white)

- **Dépendances**:
  - PySide6
  - PyQt6
  - smtplib

### 📱 Application Mobile (Kotlin)

![Kotlin](https://img.shields.io/badge/Kotlin-B125EA?style=for-the-badge&logo=kotlin&logoColor=white)
- **Dépendances**:
  - Play Services ML Kit Barcode Scanning
  - Camera Camera2
  - Play Services Analytics Impl
  - Volley
  - ZXing Android Embedded
  - ZXing Core
  - GSON

## Utilisation

Pour utiliser l'application, vous pouvez accéder au front-office via le navigateur web ou télécharger l'application mobile depuis les boutiques d'applications correspondantes. Les administrateurs peuvent se connecter au back-office pour gérer les opérations de l'association.

## Contributeurs

- Enzo MOY ([@enzomoy](https://github.com/enzomoy))
- Karim ARFAOUI ([@Karimarf](https://github.com/Karimarf))
- Kevin SURESHE ([@Sitron808](https://github.com/Sitron808))

## Licence

Ce projet est sous licence MIT. Veuillez consulter le fichier **LICENSE.md** pour plus d'informations.
