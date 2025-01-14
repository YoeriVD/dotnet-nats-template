export default function standard() {
  return `
	private class DefaultLogger : LoggingInterface
	{
		public void Debug(string m)
		{
		}

		public void Error(string m)
		{
		}

		public void Info(string m)
		{
		}
	}
	private IEncodedConnection connection;
	private LoggingInterface logger;
	public LoggingInterface Logger
	{
		get
		{
			return logger;
		}

		set
		{
			logger = value;
		}
	}	

	internal byte[] JsonSerializer(object obj)
	{
		if (obj == null)
		{
			return null;
		}
		return (byte[])obj;
	}



	internal object JsonDeserializer(byte[] buffer)
	{
		return buffer;
	}

	public void Connect()
	{
		connection = new ConnectionFactory().CreateEncodedConnection();
		setserializers();
	}

	private void setserializers()
	{
		connection.OnDeserialize = JsonDeserializer;
		connection.OnSerialize = JsonSerializer;
	}

	public void Connect(string url)
	{
		connection = new ConnectionFactory().CreateEncodedConnection(url);
		setserializers();
	}
	
	public void Connect(Options opts)
	{
		connection = new ConnectionFactory().CreateEncodedConnection(opts);
		setserializers();
	}
	public Boolean IsConnected()
	{
		return connection != null && !connection.IsClosed();
	}
	
	public void Close()
	{
		if(connection != null && !connection.IsClosed())
		{
			connection.Close();
		}
	}

`;
}
