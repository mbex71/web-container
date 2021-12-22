/**
 * @type {import('next').NextConfig}
 */

module.exports = {
  // reactStrictMode: true,  
  webpack(config,options){
    config.module.rules.push({
      test: /_app.js/,
      loader: "@module-federation/nextjs-mf/lib/federation-loader.js",
    });

    config.plugins.push(
      new options.webpack.container.ModuleFederationPlugin({
        remoteType: "var",
        remotes: {
          next2: "next2",
        },
        // shared:[]
        shared: {
          "@module-federation/nextjs-mf/lib/noop": {
            eager: false,
          },
          react: {
            // Notice shared ARE eager here.
            eager: true,
            singleton: true,
            requiredVersion: false,
          },
         
         
        },
      })
    );

    return config
  }
}
