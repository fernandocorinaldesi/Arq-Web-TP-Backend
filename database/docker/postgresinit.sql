CREATE TABLE public.usuario (
    id serial NOT NULL,
    username character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    rol character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    "resetToken" character varying(255),
    "resetTokenExpiration" timestamp with time zone,
    "createdAt" timestamp with time zone,
    "updatedAt" timestamp with time zone,
    "deletedAt" timestamp with time zone,
    "lastLogin" timestamp with time zone
);

INSERT INTO public.usuario (username, email, rol, password, "resetToken", "resetTokenExpiration", "createdAt", "updatedAt", "deletedAt", "lastLogin") VALUES ('unpaz', 'unpaz@unpaz.edu.ar', 'usuario', '$2a$05$PxGG77XLyhwkD3FclPB.dugl9EkhTiAuoCS97Qa6Zv5T.38gntXTS', NULL, NULL, '2020-09-09 08:38:41.116-03', '2020-10-05 01:34:02.968-03', NULL, '2020-10-05 01:34:02.968-03');

ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_pkey PRIMARY KEY (id)