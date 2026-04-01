-- =============================================================
--  Arxiu — Database Schema
--  Generated from API models
-- =============================================================

SET FOREIGN_KEY_CHECKS = 0;

-- -------------------------------------------------------------
--  users
-- -------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `users` (
  `id`         INT UNSIGNED    NOT NULL AUTO_INCREMENT,
  `username`   VARCHAR(100)    NOT NULL,
  `password`   VARCHAR(255)    NOT NULL,
  `created_at` TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_users_username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -------------------------------------------------------------
--  authors
-- -------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `authors` (
  `id`          INT UNSIGNED    NOT NULL AUTO_INCREMENT,
  `name`        VARCHAR(150)    NOT NULL,
  `description` TEXT,
  `created_at`  TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -------------------------------------------------------------
--  categories
-- -------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `categories` (
  `id`         INT UNSIGNED    NOT NULL AUTO_INCREMENT,
  `name`       VARCHAR(100)    NOT NULL,
  `created_at` TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_categories_name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -------------------------------------------------------------
--  posts
-- -------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `posts` (
  `id`         INT UNSIGNED    NOT NULL AUTO_INCREMENT,
  `title`      VARCHAR(255)    NOT NULL,
  `content`    LONGTEXT,
  `author_id`  INT UNSIGNED,
  `created_at` TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_posts_author` (`author_id`),
  CONSTRAINT `fk_posts_author`
    FOREIGN KEY (`author_id`) REFERENCES `authors` (`id`)
    ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -------------------------------------------------------------
--  images
-- -------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `images` (
  `id`         INT UNSIGNED    NOT NULL AUTO_INCREMENT,
  `url`        VARCHAR(1000)   NOT NULL,
  `alt_text`   VARCHAR(255)    NOT NULL DEFAULT '',
  `created_at` TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -------------------------------------------------------------
--  entity_image  (polymorphic join — entity_type: 'posts' | 'authors')
-- -------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `entity_image` (
  `id`          INT UNSIGNED    NOT NULL AUTO_INCREMENT,
  `entity_type` VARCHAR(50)     NOT NULL,
  `entity_id`   INT UNSIGNED    NOT NULL,
  `image_id`    INT UNSIGNED    NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_entity_image_lookup` (`entity_type`, `entity_id`),
  KEY `fk_entity_image_image` (`image_id`),
  CONSTRAINT `fk_entity_image_image`
    FOREIGN KEY (`image_id`) REFERENCES `images` (`id`)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -------------------------------------------------------------
--  post_category  (many-to-many: posts ↔ categories)
-- -------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `post_category` (
  `id`          INT UNSIGNED    NOT NULL AUTO_INCREMENT,
  `post_id`     INT UNSIGNED    NOT NULL,
  `category_id` INT UNSIGNED    NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_post_category` (`post_id`, `category_id`),
  KEY `fk_pc_category` (`category_id`),
  CONSTRAINT `fk_pc_post`
    FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`)
    ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_pc_category`
    FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

SET FOREIGN_KEY_CHECKS = 1;
