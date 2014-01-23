Public Class Cliente


    'Atributos

    Private sDireccion As String
    Private sNif As String
    Private sNombre As String

    'Constructor

    Public Sub New(ByVal sNif As String, ByVal sNom As String, ByVal sDir As String)

        Me.sNif = sNif
        Me.sNombre = sNom
        Me.sDireccion = sDir

    End Sub

    'Propiedades

    Public Property Direccion() As String
        Get
            Return Me.sDireccion
        End Get

        Set(ByVal value As String)
            Me.sDireccion = value
        End Set

    End Property

    Public Property NIF() As String
        Get
            Return Me.sNif
        End Get

        Set(ByVal value As String)
            Me.sNif = value
        End Set

    End Property

    Public Property Nombre() As String
        Get
            Return Me.sNombre
        End Get

        Set(ByVal value As String)
            Me.sNombre = value
        End Set

    End Property

    'Metodos

    Public Overrides Function ToString() As String
        Dim sCad As String

        sCad = "NIF: " & Me.sNif.PadRight(15)
        sCad &= "NOMBRE: " & Me.sNombre & ControlChars.NewLine
        sCad &= "DIRECCION:" & Me.sDireccion

        Return sCad

    End Function


End Class

