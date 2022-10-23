FROM gitpod/workspace-dotnet:latest

RUN mkdir -p /home/gitpod/dotnet && curl -fsSL https://dot.net/v1/dotnet-install.sh | bash /dev/stdin --version 6.0.402 --install-dir /home/gitpod/dotnet
ENV DOTNET_ROOT=/home/gitpod/dotnet
ENV PATH=/home/gitpod/dotnet:$PATH