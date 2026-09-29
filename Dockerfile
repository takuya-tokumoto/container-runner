FROM nginx:stable-alpine

# ビルド時に渡すコミットのハッシュ値。渡さなければ local になる
ARG GIT_SHA=local

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY index.html game.js /usr/share/nginx/html/

# どのコミットからいつビルドしたかを JSON に書き出す
RUN printf '{"commit":"%s","builtAt":"%s"}\n' "$GIT_SHA" "$(date -u +%Y-%m-%dT%H:%M:%SZ)" \
    > /usr/share/nginx/html/version.json

EXPOSE 80
