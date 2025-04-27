{
  description = "Purrtun website (Next, PandaCSS, Turbopack)";

  inputs = {
    nixpkgs.url = "nixpkgs/nixos-unstable-small";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = import nixpkgs { inherit system; };
        # nodejs
        nodejs = pkgs.nodejs-slim_23;
        npm = pkgs.pnpm;
      in
      {
        devShells.default = pkgs.mkShell {
          buildInputs = [
            nodejs
            npm
          ];
        };
      }
    );
}
